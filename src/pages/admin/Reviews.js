import React from 'react'
import Container from '../../components/Container'

import AdminPageHeader from './AdminPageHeader'
import ReviewsList from './ReviewsList'

const Reviews = () => {
    return (
        <div className='bg-[#F9F9FA]'>
            <Container className={'pb-24 md:pb-12'}>
                <AdminPageHeader />
                <ReviewsList />
            </Container>
        </div>
    )
}

export default Reviews