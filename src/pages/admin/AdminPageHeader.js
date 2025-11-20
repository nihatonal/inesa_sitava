import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/LogoutButton'
import { ArrowLeft } from 'lucide-react';
const AdminPageHeader = () => {
    return (
        <div className='flex items-center justify-between py-8 '>
            <Link
                to="/admin/dashboard"
                className="inline-flex items-center text-primary-dark hover:text-accent transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Панель администратора
            </Link>
            <LogoutButton />
        </div>
    )
}

export default AdminPageHeader