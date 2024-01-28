from flask import Flask, jsonify, render_template,request, session
from newsapi import NewsApiClient
import cohere
from cohere.error import CohereAPIError
import newspaper
import time
import secrets
import random
co = cohere.Client('1qUYE3Zbh9NErIJRyqyGrbnrc3kzcOeKXY9FGV4F')
newsapi = NewsApiClient(api_key='6e48c94dcc704c2a92d0ba3d17d71adc')


app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
correct_answers = {}

def extract_article_content(url):
    # Create a newspaper Article object
    article = newspaper.Article(url)

    try:
        # Download and parse the article
        article.download()
        article.parse()

        # Extract the title and text content
        title = article.title
        content = article.text

        return title, content

    except Exception as e:
        print(f"Error extracting content from {url}: {e}")
        return None, None

def get_article():
    
    all_articles = newsapi.get_everything(q='science',
                                          sources='bbc-news,the-verge',
                                          domains='bbc.co.uk,techcrunch.com',
                                          from_param='2023-12-28',
                                          to='2024-01-26',
                                          language='en',
                                          sort_by='relevancy',
                                          page=2)
    while True:
        x = random.randrange(10)
        article = all_articles['articles'][x]
        try:
            response = co.generate(
          prompt= article['title'] + '\n Does the above headline carry a positive sentiment? Answer in yes or no',
            )
            if response.data[0].text.strip().lower().startswith('y'):
                url = article['url']
                title, content = extract_article_content(url)
                if len(content) >= 4000:
                    continue
                if not title or not content:
                    print("Failed to extract content.")
                return title,content
        except CohereAPIError as e:
            print(e)
            time.sleep(60)
                    
def generate_question(content):
    while True:
        try:
            response = co.generate(
        prompt= content + '\n Generate a True or False question from the above text. Give me the answer in the next sentence. Your question should be of the format: "Q:question,A:True/False"',
            )
            question_string = response.data[0].text.strip()
            #print(question_string)
            parts = question_string.replace("'", "").split("\n")
            if len(parts) == 1:
                parts = question_string.replace("'", "").split(",")
            # Extract question and answer and create a dictionary
            print(question_string)
            print(parts)
            question = {parts[0][2:].strip(): parts[1][2:].strip()}
            return question
        except CohereAPIError as e:
            print(e)
            time.sleep(60)
        except Exception as e:
            print(e)



# Your existing code for functions and imports goes here...
@app.route('/')
def home():
    return render_template('index.html', generatedArticle="", generatedQuestion="")

@app.route('/get_article', methods=['GET'])
def get_article_route():
    article_title, article_content = get_article()
    session['article_title'] = article_title
    session['article_content'] = article_content
    questions = []
    for i in range(3):
        question = generate_question(article_content)
        questions.append(question)
    question_list = [list(i.keys())[0] for i in questions ]
    print(question_list)
    global correct_answers
    correct_answers = {'q1': list(questions[0].values())[0], 'q2': list(questions[1].values())[0], 'q3': list(questions[2].values())[0]}
    print("Correct answers: ",correct_answers)
    return render_template('index.html', generatedArticleTitle=article_title,
                            generatedArticleContent=article_content,
                            question1 = question_list[0], 
                            question2 = question_list[1], 
                            question3 = question_list[2]
                            )




@app.route('/check_quiz', methods=['POST'])
def check_quiz():
    try:
        # Retrieve the correct answers (you can customize based on your requirements)
        #correct_answers = {'q1': 'True', 'q2': 'False', 'q3': 'True'}

        # Extract user's answers from the request
        user_answers = request.get_json()
        print(user_answers)

        # Check if the answers are correct
        if user_answers == correct_answers:
            return jsonify({'message': 'Quiz passed!'})
        else:
            return jsonify({'message': 'Try again. Incorrect answers.'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
