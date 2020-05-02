import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import Button from '../components/Button'
import './index.scss'
import { Router } from 'next/router'

const Home = (props) => {
  return(
    <div className = 'home-wrapper'>
      <div className = 'home-container'>
        <div className = 'home-header'>
          <Link href = '/'>
            <a className = 'home-header-logo'>Loose Dev</a>
          </Link>
          <Link href = '/sign-in'>
            <Button text = 'Sign In' onClick = { () => {router.push('/sign-in')}} submitting = {false}>
              Sign In
            </Button>
          </Link>
        </div>
        <div className = 'home-content'>
          <div className = 'home-cta'>
            <div className = 'home-cta-text-container'>
              <span className = 'home-cta-text-1'>Work in{' '}</span>
              <span className = 'home-cta-text-2'>PROGRESS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home