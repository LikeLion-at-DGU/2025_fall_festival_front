import React from 'react';
import PersonCard from '../../components/DevelopersComponents/PersonCard';

function Developers() {
  return (
    <div>
      <h1>개발자 소개 페이지입니다.</h1>
      <PersonCard track="FE" name="최선우" info="컴퓨터 ai"/>
    </div>
  );
};

export default Developers;