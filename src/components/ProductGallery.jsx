import React, { Component } from 'react';

class ProductGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImageIdx: 0,
    }
  }

	handleThumbnailClick = (idx) => (e) => { 
    e.preventDefault();

    this.setState({
      selectedImageIdx: idx,
    });
	};

  render() {
    const { images } = this.props;
    const { selectedImageIdx } = this.state;
    const activeImageUrl = images[selectedImageIdx];

    return (
      <div className="Product-gallery col-sm-6 col-xs-12">
        <div className="Product-active">
          <img src={ activeImageUrl } alt={'activeImage'} />
        </div>
        <div className="Product-thumbnails">
          {images.map((thumb, idx) => {
            return (
              <div 
                className={`Product-thumbnail-item ${idx === selectedImageIdx ? 'Product-thumbnail-item-active' : ''}`}
                key={'thumb' + idx}
                onClick={this.handleThumbnailClick(idx)}>
                <img src={thumb} alt={'thumb'} />
              </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ProductGallery;