import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';

import NewsArticle from './components/Articles/News/Post/index'
import VideoArticle from './components/Articles/Videos/Video/index'
import NewsMain from './components/Articles/News/Main/index'
import VideoMain from './components/Articles/Videos/Main/index'
import SignIn from './components/signin/signin';
import Dashboard from './components/Dashboard/dashboard'
class Routes extends Component {
  
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path="/news" exact component={NewsMain}/>
					<Route path="/articles/:id"
					exact component={NewsArticle}/>
          <Route path="/videos/:id" exact component={VideoArticle}/>
          <Route path="/videos" exact component={VideoMain}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
