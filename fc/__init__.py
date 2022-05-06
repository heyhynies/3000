# -*- coding: utf-8 -*-
import os
import click
from flask import Flask, render_template
from fc.blueprints.auth import auth_bp
from fc.blueprints.main import main_bp
from fc.blueprints.user import user_bp
from fc.blueprints.data import data_bp
from fc.extensions import bootstrap, db, login_manager, mail, moment
from fc.models import User
from fc.settings import config

# 初始化文件
# (Initialization file)
def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')

    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('index.html')
    # 加载配置
    # (Loading configuration)
    app.config.from_object(config[config_name])
    app.config['MAIL_DEBUG'] = True  # 开启debug，便于调试看信息 (Turn on debug for easy debugging to see information)
    app.config['MAIL_SUPPRESS_SEND'] = False  # 发送邮件，为True则不发送 (Send email, True does not send)
    app.config['MAIL_SERVER'] = 'smtp.qq.com'  # 邮箱服务器 (Mailbox server)
    app.config['MAIL_PORT'] = 465  # 端口 (Port)
    app.config['MAIL_USE_SSL'] = True  # 重要，qq邮箱需要使用SSL (Important, qq email requires SSL)
    app.config['MAIL_USE_TLS'] = False  # 不需要使用TLS (No need to use TLS)
    app.config['MAIL_USERNAME'] = '1528377935@qq.com'
    app.config['MAIL_PASSWORD'] = 'zxdiiljzjncoggbj'
    app.config['MAIL_DEFAULT_SENDER'] = '1528377935@qq.com'  # 填邮箱，默认发送者 (Fill in email, default sender)


    register_extensions(app)
    register_blueprints(app)
    register_commands(app)
    register_errorhandlers(app)
    register_shell_context(app)
    register_template_context(app)

    return app


def register_extensions(app):
    # 前后端连接器
    # (Front and rear end connectors)
    bootstrap.init_app(app)
    # 数据库连接器
    # (Database connectors)
    db.init_app(app)
    # 登陆管里连接器
    # (Landing tube connectors)
    login_manager.init_app(app)
    # 邮箱连接器
    # (Mailbox connectors)
    mail.init_app(app)
    # 状态连接器
    # (Status connectors)
    moment.init_app(app)


def register_blueprints(app):
    # 连接的定义
    # (Definition of connection)
    app.register_blueprint(main_bp, url_prefix='/main')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(data_bp, url_prefix='/data')


def register_shell_context(app):
    @app.shell_context_processor
    def make_shell_context():
        return dict(db=db, User=User)


def register_template_context(app):
    pass


def register_errorhandlers(app):
    @app.errorhandler(400)
    def bad_request(e):
        return render_template('errors/400.html'), 400

    @app.errorhandler(403)
    def forbidden(e):
        return render_template('errors/403.html'), 403

    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('errors/404.html'), 404

    @app.errorhandler(413)
    def request_entity_too_large(e):
        return render_template('errors/413.html'), 413

    @app.errorhandler(500)
    def internal_server_error(e):
        return render_template('errors/500.html'), 500


def register_commands(app):
    @app.cli.command()
    @click.option('--drop', is_flag=True, help='Create after drop.')
    def initdb(drop):
        """Initialize the database."""
        if drop:
            click.confirm('This operation will delete the database, do you want to continue?', abort=True)
            db.drop_all()
            click.echo('Drop tables.')
        db.create_all()
        click.echo('Initialized database.')

    @app.cli.command()
    def init():
        """Initialize Albumy."""
        click.echo('Initializing the database...')
        db.create_all()

        click.echo('Done.')
