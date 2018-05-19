import React, { Component } from 'react';
import styles from './styles.css';
import Header from '../../components/header';
import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios';
import moment from 'moment';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }
  componentDidMount() {
    axios.get('https://public-api.wordpress.com/rest/v1.1/sites/randikaahlam.wordpress.com/posts/')
      .then((response) => {
        this.setState({ posts: response.data.posts});
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const items = this.state.posts.map((item) => {
      const image = item.attachments[Object.keys(item.attachments)[0]].URL;
      return (
        <figure className={styles.imageContainer} key={item.ID}>
          <img className={styles.image} src={image} alt="" />
          <figcaption className={styles.figcaption}>{moment(item.date).format("MMM Do YY")}</figcaption>
        </figure>
      );
    })
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.intro}>
          <p className={styles.introText}>Hello, my name is Randika</p>
        </div>
        <CSSTransitionGroup
          className={styles.galleryContainer}
          transitionName='fade'
          delay={1500}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={500}>
          {items}
        </CSSTransitionGroup>
      </div>
    );
  }
}
export default Home;