import React, { useEffect, useState } from 'react'
import './ViewMember.css'
import { Card, CardHeader, CardBody, Heading, Text, Image, Switch, FormLabel, CardFooter, Avatar,AvatarBadge, Spinner  } from '@chakra-ui/react'
import { SearchIcon,CloseIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'





const ViewMember = () => {
    const [memberData, setMemberData] = useState()
    const [original,setOriginal]=useState()
    const [searchData,setSearchData]=useState("");
    const [searchActive,setSearchActive]=useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:2000/api/v1/memberslist/view-members", {
                    withCredentials: true
                })
                setMemberData(response?.data?.data)
                setOriginal(response?.data?.data)

            } catch (error) {
                console.log(error, "errror occured while fetching the data from backend")
            }
        }

        fetchData()


    }, [])
    const handleChange=(event)=>{
         setSearchData(event.target.value)
    }
    const handleCancel=()=>{
        setSearchData("");
        console.log(memberData)
        setMemberData(original)
        setSearchActive(!searchActive)
   }


    const handleSearch=()=>{
          const filterMember= memberData.filter((Member)=>{
                  return Member?.memberId.fullName === searchData
          })
          setSearchActive(!searchActive)
          setMemberData(filterMember)
    }


    return (
        <>
            <ChakraProvider>



                <div className='member-area'>
                    <div className='member-bar'>
                        <div>sort by registration date</div>
                        <div className='search-bar'>
                          <input 
                          color='black' 
                          type='text' 
                          placeholder='Search by name'
                          value={searchData}
                          onChange={handleChange}
                          >

                          </input>{
                           searchActive?<SearchIcon onClick={handleSearch}  color="white" margin="0px 4px" boxSize="20px"/>:
                              <CloseIcon onClick={handleCancel} color="white" margin="0px 4px" boxSize="20px" />
                          }
                          
                        </div>
                    </div>
                    <div className='member-content'>
                        {memberData?.length > 0 ? (
                            memberData.map((Member) => {
                                     const today = new Date()
                                     const endDate= new Date(Member?.endDate)
                                     const isActive = today.getTime()<endDate.getTime()
                                                          
                                return (
                                         
                                    <Card
                                        key={Member._id}
                                        display="flex"
                                        boxShadow="white 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                                        width="30%"
                                        border="4px solid"
                                        backgroundColor="#01070f"
                                        borderRadius="20px"
                                        padding=" 10px 20px"
                                        color="white"
                                    >
                                        <CardBody textAlign="center" display="flex" flexDirection="column" justifyItems="left" alignItems="center">
                                            {/* <Switch display="flex" alignContent="left" justifyItems="left" justifyContent="left"/> */}

                                            <Avatar style={{ border: "2px solid white" }}
                                              borderRadius="200px"
                                               width="160px"
                                               height="160px"
                                               borderColor="#01070f"
                                               src={Member?.memberId?.photo || ""}
                                               objectFit="cover"  
                                               padding="10px"
                                               margin="10px"                                          
                                            >
                                                  <AvatarBadge boxSize='32px' bg={isActive?'green.600':'red.600'} />   
                                            </Avatar>
                                            <Heading fontSize="24px">{Member?.memberId?.fullName.toUpperCase()}</Heading>
                                            <Text padding="3px">{Member?.memberId?.email}</Text>
                                            <Text padding="3px">Mobile-Number:{Member?.memberId?.mobileNumber}</Text>
                                        </CardBody>

                                        <CardFooter display="flex" flexDirection="column" justifyContent="left" justifyItems="left">
                                            <Heading fontSize="22px">Subscription Details</Heading>
                                            <Text padding="3px"><span style={{fontWeight:"bold"}}>Joining Date: </span>{ new Date(Member?.startDate).toLocaleDateString()||'N/A'}</Text>
                                            <Text padding="3px"><span style={{fontWeight:"bold"}}>Ending Date: </span>  { new Date(Member?.endDate).toLocaleDateString()||'N/A'}</Text>
                                            <Text padding="3px"><span style={{fontWeight:"bold"}}>Duration: </span>{Member?.Durationmonths} months</Text>
                                        </CardFooter>

                                    </Card>
                                )
                            })


                        ) : (<Spinner size="xl" />)}

                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}

export default ViewMember