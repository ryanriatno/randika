import React, { Component } from 'react';
import styles from './styles.css';
import Header from '../../components/header';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import MediaQuery from 'react-responsive';

import axios from 'axios';
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      PHOTO_SET: [],
      currentImage: 0,
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  componentDidMount() {
    axios.get('https://public-api.wordpress.com/rest/v1.1/sites/randikaahlam.wordpress.com/posts/')
      .then((response) => {
        const photo_array = [];
        response.data.posts.map((item) => {
          const data = {};
          data.src = item.attachments[Object.keys(item.attachments)[0]].URL;
          data.width = item.attachments[Object.keys(item.attachments)[0]].width;
          data.height = item.attachments[Object.keys(item.attachments)[0]].height;
          return photo_array.push(data);
        })
        this.setState({ PHOTO_SET: photo_array })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const containerStyle = {
      cursor: 'pointer',
      overflow: 'hidden',
      float: 'left',
      position: 'relative'
    }
    const SelectedImage = ({ index, onClick, photo, margin }) => {
      return (
        <div style={{ margin, width: photo.width, ...containerStyle }}>
    
          <img alt="" className={styles.img} {...photo} onClick={(e) => onClick(e, { index, photo })} />
    
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.intro}>
          <p className={styles.introText}>Hello, my name is Randika. <br />Welcome to my website gallery. You can also follow me on <a href="https://instagram.com/randikaahlam">Instagram</a></p>
        </div>
        <div className={styles.galleryContainer}>
          <MediaQuery query="(max-device-width: 1224px)">
            <Gallery columns={1} margin={0} photos={this.state.PHOTO_SET} onClick={this.openLightbox} ImageComponent={SelectedImage} />
          </MediaQuery>
          <MediaQuery query="(min-device-width: 1224px)">
            <Gallery columns={3} margin={0} photos={this.state.PHOTO_SET} onClick={this.openLightbox} ImageComponent={SelectedImage} />
          </MediaQuery>
          <Lightbox images={this.state.PHOTO_SET}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        </div>
      </div>
    );
  }
}
export default Home;