import React, { Component } from 'react';

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bodySize: this.getActiveAttributeValue('Beden'),
      color: this.getActiveAttributeValue('Renk'),
    }
  }

  getActiveAttributeValue = (attrName) => {
    const { attributes } = this.props;

    return attributes.find(attr => attr.name === attrName).value
  };

  changeProductVariant = (variantType, variantValue) => {
    if (variantType === 'Beden') {
      this.setState({
        bodySize: variantValue,
      })
    } else if (variantType === 'Renk') {
      this.setState({
        color: variantValue,
      })
    }

    const { bodySize, color } = this.state;
    this.props.changeProductVariant(bodySize, color);
  };

  /*isAttributeDisabled = (attrName = 'Renk', body = 'L', color = 'Siyah') => {
    const { productVariants } = this.props;
    let arr = [];
    
    productVariants.forEach(variant => {
      const attrs = variant.attributes;
      const productMap = {};
      attrs.forEach(function(attr) {
        productMap[attr.value] = attr.value 
        arr.push(productMap) 
      })
    })

    return arr;
  };*/

  render() {
    const { 
      productTitle,
      selectableAttributes,
    } = this.props;

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
      </div>
    )
  }
}

export default ProductInfo;