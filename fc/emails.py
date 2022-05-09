# -*- coding: utf-8 -*-

from threading import Thread
from flask import current_app, render_template
from flask_mail import Message
from fc.extensions import mail

def _send_async_mail(app, message):
    with app.app_context():
        mail.send(message)

def send_mail(to, subject, template, **kwargs):
    message = Message(current_app.config['ALBUMY_MAIL_SUBJECT_PREFIX'] + subject, recipients=[to])
    message.body = render_template(template + '.txt', **kwargs)
    message.html = render_template(template + '.html', **kwargs)
    app = current_app._get_current_object()

    thr = Thread(target=_send_async_mail, args=[app, message])
    thr.start()

    # msg = Message(subject='Hello World',
    #               # sender="xxx@qq.com",
    #                                         If you want to use the default sender, you do not need to fill in
    #               recipients=['1528377935@qq.com'])

    # The content of the email will be presented in both text and html formats,
    # and which format you can see depends on your email client.)
    # msg.body = 'sended by flask-email'
    # msg.html = '<b>Testing Flask for sending emails<b>'
    # thread = Thread(target=_send_async_mail, args=[app, msg])
    # thread.start()

    return thr



def send_confirm_email(user, token, to=None):
    send_mail(subject='Email Confirm', to=to or user.email, template='emails/confirm', user=user, token=token)


def send_reset_password_email(user, token):
    send_mail(subject='Password Reset', to=user.email, template='emails/reset_password', user=user, token=token)
