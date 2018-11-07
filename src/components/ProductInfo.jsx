import React, { Component } from 'react';

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodySize: this.getActiveAttributeValue('Beden'),
      color: this.getActiveAttributeValue('Renk'),
      productCount: 0,
    }
  }

  getActiveAttributeValue = (attrName) => {
    const { attributes } = this.props;

    return attributes.find(attr => attr.name === attrName).value
  };

  getActivePriceBarem = (minQuantity, maxQuantity) => {
    const { productCount } = this.state;

    if ((minQuantity <= productCount) && (productCount <= maxQuantity)) {
      return true;
    }

    return false;
  };

  getSelectedBarem = () => {
    const { productCount } = this.state;
    const { baremList } = this.props

    const barem = baremList.find(function(barem) {
      return ((barem.minimumQuantity <= productCount) && (productCount <= barem.maximumQuantity));
    });

    return barem;
  };

  changeProductVariant = (variantType, variantValue) => {
    const { bodySize, color } = this.state;

    if (variantType === 'Beden') {
      this.setState({
        bodySize: variantValue,
      }, () => {
        this.props.changeProductVariant(variantValue, color);
      })
    } else if (variantType === 'Renk') {
      this.setState({
        color: variantValue,
      }, () => {
        this.props.changeProductVariant(bodySize, variantValue);
      })
    }
  };

  changeProductCount = (e) => {
    const productCount = e.target.value;
    
    this.setState({
      productCount,
    });
  };

  isAttributeDisabled = (bodySize, color) => {
    const { productVariants } = this.props;
    const selectedVariant = productVariants.filter(function(variant) {
      return variant.attributes[0].value === bodySize && variant.attributes[1].value === color
    })[0]

    return !selectedVariant;
  };

  getTotalPrice = () => {
    let baremPrice = 0;
    if (this.getSelectedBarem()) {
      baremPrice = this.getSelectedBarem().price;
    }

    const totalPrice = this.state.productCount * baremPrice;
    return `${ totalPrice.toFixed(2) } TL`
  };

  addBasket = () => {
    console.info("Selected Attribute Id:", this.props.selectedVariantId);
    console.info("Selected Barem", this.getSelectedBarem());
  };

  render() {
    const { 
      productTitle,
      selectableAttributes,
      baremList,
    } = this.props;

    const { color, productCount, } = this.state;

    return (
      <div className="Product-info col-sm-6 col-xs-12">
        <div className="Product-title">
          { productTitle }
        </div>
        <div className="Product-attributes">
          {selectableAttributes.map((attribute, idx) => {
            return (
              <div 
                className="Product-attribute-item"
                key={'attributeTitle-' + idx}>
                <div className="Product-attribute-title">
                  { attribute.name }:
                </div>
                {attribute.values.map( (value, valIdx) => {
                  return (
                    <button
                      // TODO: Get values from dynamic data!
                      disabled={color === 'Siyah' && (value === 'M' || value === 'XL')}
                      onClick={() => this.changeProductVariant(attribute.name, value)}
                      key={'attributeValue-' + valIdx}
                      className={`Product-attribute-button ${this.getActiveAttributeValue(attribute.name) === value ? 'Product-attribute-button-active' : ''}`}>
                      {value}
                    </button>
                  )
                })}
              </div>
              )
            })
          }
        </div>
        <div className="Product-prices">
          <div className="Product-prices-title">Toptan Fiyat: <br/> (Adet)</div>
          {baremList.map((barem, idx) => {
            return (
              <div className={`Product-price ${this.getActivePriceBarem(barem.minimumQuantity, barem.maximumQuantity) ? 'Product-price-active' : ''}`} key={idx}>
                <div>{ barem.minimumQuantity} - { barem.maximumQuantity}</div>
                <div>{ barem.price } TL</div>
              </div>
            )
          })}
          <div className="Product-prices-count">
            <div className="Product-prices-title">Adet:</div>
            <input
              className="Product-price-count-input"
              type="number"
              onChange={this.changeProductCount} />
          </div>
        </div>
        <div className="Product-basket-summary">
          <div className="Product-basket-title">Toplam:</div>
          <div className="Product-basket-total">{ this.getTotalPrice() }</div>
        </div>
        <button
          className="Product-basket-button"
          onClick={() => this.addBasket()}
          disabled={productCount === 0}>
          SEPETE EKLE
        </button>
      </div>
    )
  }
}

export default ProductInfo;