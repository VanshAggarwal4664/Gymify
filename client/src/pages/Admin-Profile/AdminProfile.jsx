import { Card, CardBody, CardHeader, ChakraProvider,Image,Heading,Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import './AdminProfile.css'
import { useSelector } from 'react-redux'


const AdminProfile = () => {
    // const location = useLocation()
    const { username, email, logo } = useSelector((state)=>{
        return state.user
    })
    console.log(username)
    return (
        <>
            <ChakraProvider>
                <div className='Admin'>
                    <div className="Admin-Heading">
                        <Heading>Admin Information</Heading>
                    </div>

                    <div className='Admin-edit'>
                        <Card backgroundColor="#01070f"  border="2px Solid white" align="flex-start" textAlign="center" padding={6}>
                            <CardHeader>
                            <Image textAlign="left" border="2px solid white" padding="10px" src={ logo} alt="" boxSize="80px" borderRadius="full" />
                            {/* <input type="file" /> */}
                            </CardHeader>
                            <CardBody>
                            <Heading textAlign="left" fontSize={26} color="white">{(username).toUpperCase()}</Heading>
                             <Text textAlign="left" fontSize={19} color="white">{email}</Text>
                            </CardBody>
                        </Card>
                      
                      
                            <form>  Change Password </form>
                    
                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}

export default AdminProfile