import React from 'react';
import ProfileCard from './profileCard/ProfileCard';

export default function Header() {
    return (
        <div>
            <header className='App-header'>
                <div>
                    <ProfileCard></ProfileCard>
                </div>
            </header>
        </div>
    );
}
