# -*- coding: utf-8 -*-
import json

from flask import render_template, Blueprint, request, jsonify
from flask_login import login_required


main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    return render_template('index.html')


@main_bp.route('/explore')
@login_required
def explore():

    return render_template('main.html')


@main_bp.route('/search')
def search():
    return render_template('search.html')

