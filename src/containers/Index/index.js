import React from 'react'
import style from './index.css'

import { Link } from 'react-router-dom'

const Index = () =>
  <div>
    <Link to='/mhp'>
      MHP配装器
    </Link>
    <br />
    <Link to='/mhp2'>
      MHP2配装器
    </Link>
  </div>

export default Index
