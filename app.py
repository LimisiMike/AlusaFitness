from flask import Flask, request, render_template
from .models import db
from flask_migrate import Migrate

app=Flask(__name__,static_url_path='/static')

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:@127.0.0.1:3306/alusa_fitness'
app.config['SECRET_KEY']='a6ccbe3bc4bfa0e93fcc0dd814a9b758fc278fa96b7eb0fc4e9d273789c5'

migrate = Migrate()

    
db.init_app(app)
migrate.init_app(app, db)
    
from .routes import main as main_blueprint
app.register_blueprint(main_blueprint)

@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        # Handle POST Request here
        return render_template('index.html')
    return render_template('index.html')


if __name__ == '__main__':
    app.run(port=5000,debug=True)