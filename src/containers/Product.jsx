import React, { Component } from 'react';
import data from '../product.json';
import ProductInfo from '../components/ProductInfo.jsx';
import ProductGallery from '../components/ProductGallery.jsx';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVariantId: data.productVariants[0].id,
    };
  }

  changeProductVariant = (bodySize, color) => {
    const { productVariants } = data;
    
    const selectedVariant = productVariants.filter(function(variant) {
      return variant.attributes[0].value === bodySize && variant.attributes[1].value === color
    })[0]

    if (selectedVariant) {
      this.setState({
        selectedVariantId: selectedVariant.id,
      })
    }
  };

  render() {
    const { 
      productTitle,
      productVariants,
      selectableAttributes,
      baremList,
    } = data;
    const { selectedVariantId } = this.state;
    const currentProduct = productVariants.find(product => product.id === selectedVariantId);

    return (
      <main className="Product">
        <div className="container">
          <div className="Product-wrap">
            <div className="row">
              <ProductGallery images={ currentProduct.images } />
              <ProductInfo
                selectedVariantId={ selectedVariantId }
                changeProductVariant={ this.changeProductVariant }
                productVariants = { productVariants }
                attributes={ currentProduct.attributes }
                productTitle={ productTitle }
                selectableAttributes={ selectableAttributes}
                baremList={ baremList } />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Product;