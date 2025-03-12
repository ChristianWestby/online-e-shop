import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {
  cardContainer,
  cardImage,
  cardText,
  priceText,
} from "../styles/mixins";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CarouselWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const ProductCarouselContainer = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const ProductCard = styled(Link)`
  ${cardContainer}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow: hidden;
  max-width: 180px;
  min-height: 260px;
`;

const ProductImage = styled.img`
  ${cardImage}
  width: 100% !important;
  height: 180px !important;
  min-height: 180px !important;
  object-fit: cover;
  border-radius: 5px;
  display: block;
`;
const ProductTitle = styled.h3`
  ${cardText}
`;

const ProductPrice = styled.p`
  ${priceText}
`;

const ProductCarousel = ({ relatedProducts = [] }) => {
  if (!Array.isArray(relatedProducts) || relatedProducts.length === 0) {
    return <p>No related products available.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <CarouselWrapper>
      <h2>Recommended Products</h2>
      <ProductCarouselContainer>
        <Slider {...settings}>
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} to={`/product/${item.id}`}>
              <ProductImage
                src={item.image?.url || "https://via.placeholder.com/180"}
                alt={item.title}
              />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.price} NOK</ProductPrice>
            </ProductCard>
          ))}
        </Slider>
      </ProductCarouselContainer>
    </CarouselWrapper>
  );
};

ProductCarousel.propTypes = {
  relatedProducts: PropTypes.array.isRequired,
};

export default ProductCarousel;
