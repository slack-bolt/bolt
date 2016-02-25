#!/usr/bin/env node

import blessed from 'blessed'; //eslint-disable-line
import contrib from 'blessed-contrib'; //eslint-disable-line
import screen from './screen';
import log from './components/log';
import message from './components/message';
import menu from './components/menu';
// import loading from './components/loading';
import chat from './components/chat';
import stats from './components/stats';

screen.append(message);
screen.append(log);
screen.append(stats);
screen.append(chat);

// screen.append(loading);
screen.append(menu);
screen.render();

screen.emit('route', 'chat');
// loading.load('Please wait');
