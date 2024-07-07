import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/joy/Stack';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import './UserInfo.css';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const UserInfoForm = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        name: false,
        mobile: false,
        email: false
    });

    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newErrors = {
            name: name.trim() === '',
            mobile: mobile.trim() === '',
            email: email.trim() === ''
        };
        setErrors(newErrors);

        // Only proceed if there are no errors
        if (!newErrors.name && !newErrors.mobile && !newErrors.email) {
            // Save data to local storage
            localStorage.setItem('userInfo', JSON.stringify({ name, mobile, email }));
            
            // Handle form submission (e.g., send data to an API)
            console.log('Form submitted:', { name, mobile, email });

            navigate('/table-page')
        }
    };

    return (
        <div className='form_page'>
            <form className='user_form' onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl error={errors.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Type your name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <FormHelperText>
                                <InfoOutlined />
                                Oops! Name is required.
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl error={errors.mobile}>
                        <FormLabel>Mobile Number</FormLabel>
                        <Input
                            placeholder="Type your mobile number..."
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {errors.mobile && (
                            <FormHelperText>
                                <InfoOutlined />
                                Oops! Mobile number is required.
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl error={errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            placeholder="Type your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <FormHelperText>
                                <InfoOutlined />
                                Oops! Email is required.
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Button type="submit" endDecorator={<KeyboardArrowRight />} color="success">
                        Go to Table
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default UserInfoForm;
