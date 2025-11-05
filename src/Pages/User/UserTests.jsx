import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TestCard from '../../Components/TestCard';
import Button from '../../Components/common/Button';
import AllTest from '../../Components/AllTest';

function UserTests() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AllTest/>
    );
}

export default UserTests;