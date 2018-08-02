import React from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export const FirstPage = () => {
  console.log('rendering FirstPage');
  return (
    <PageHeaderLayout title="页面标题">
      <div>
        {'这是第一个页面'}
      </div>
    </PageHeaderLayout>
  );
};

export const SecondPage = props => (
  <PageHeaderLayout title="页面标题">
    <div>
      {`这是测试页面: ${props.location.pathname}`}
    </div>
  </PageHeaderLayout>
);

export const OtherPage = () => (
  <PageHeaderLayout title="页面标题">
    <div>
      {'这是第其他页面'}
    </div>
  </PageHeaderLayout>
);

export default FirstPage;
