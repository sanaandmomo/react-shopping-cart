import { useEffect, VFC } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useRouteMatch } from 'react-router';
import Loading from '../../components/Loading';
import ProductDetailSection from '../../components/ProductDetail';
import Template from '../../components/shared/Template';
import useFetch from '../../service/hooks/useFetch';
import { requestProduct } from '../../service/request/productList';
import { Product } from '../../types';

interface MatchParams {
  productId: string;
}

const ProductDetailPage: VFC = () => {
  const match = useRouteMatch<MatchParams>();
  const productId = Number(match?.params?.productId);
  const product = useFetch(() => requestProduct(productId));

  useErrorHandler(product.error);

  return (
    <Template>
      <Loading isLoading={product.isLoading}>
        <ProductDetailSection product={product.data as Product} />
      </Loading>
    </Template>
  );
};

export default ProductDetailPage;