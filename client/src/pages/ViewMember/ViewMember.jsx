import React, { useEffect, useState } from 'react'
import './ViewMember.css'
import { Card, CardHeader, CardBody, Heading, Text, Image, Switch, FormLabel, CardFooter, Avatar, AvatarBadge, Spinner, Flex, Button } from '@chakra-ui/react'
import { SearchIcon, CloseIcon, DeleteIcon,EditIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ViewMember = () => {
    const navigate=useNavigate()
    const [memberData, setMemberData] = useState()
    const [original, setOriginal] = useState()
    const [searchData, setSearchData] = useState("");
    const [searchActive, setSearchActive] = useState(true)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:2000/api/v1/memberslist/view-members", {
                    withCredentials: true
                })
                setMemberData(response?.data?.data)
                setOriginal(response?.data?.data)
                console.log(original)

            } catch (error) {
                console.log(error, "errror occured while fetching the data from backend")
            }
        }

        fetchData()


    }, [])

    const handleChange = (event) => {
        setSearchData(event.target.value)
    }
    const handleCancel = () => {
        setSearchData("");
        console.log(memberData)
        setMemberData(original)
        setSearchActive(!searchActive)
    }

    const handleSort = (event) => {
        const sortType = event.target.value;
        let sortedData = [...original];  // Create a shallow copy of the original data
        console.log(sortedData)
        // console.log("Original data before sorting:", original);  // Log original data
    
        switch (sortType) {
            case 'start':
                sortedData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                // console.log("Sorted by start date (ascending):", sortedData);
                break;
            case 'end':
                sortedData.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
                // console.log("Sorted by end date (descending):", sortedData);
                break;
            default:
                console.log("Default case: no sorting applied");
                return;
        }
    
        // console.log("Sorted data after sorting operation:", sortedData);  // Log sorted data
        setMemberData(sortedData);  // Update state with sorted data
    };

    const handleSearch = () => {
        const searchname = (searchData).toLowerCase()

        const filterMember = memberData.filter((Member) => {
            const fullnamewords = (Member?.memberId.fullName).toLowerCase().split(' ')
            const searchwords = searchname.split(' ');
            return searchwords.every((word) => {
                console.log(word)
                return fullnamewords.some((fword) => {
                    console.log(fword)
                    console.log(fword.startsWith(word))
                    return fword.startsWith(word)
                })
            })

            //   console.log(fullname,searchname)
            //   console.log(fullname === searchname)
            //   return fullname === searchname
        })
        setSearchActive(!searchActive)
        setMemberData(filterMember)
    }

    const handleDelete=async(Id,photoUrl)=>{
        const photoId= photoUrl.split('/').pop().split('.')[0]
       const response = await axios.delete(`http://localhost:2000/api/v1/members/${Id}/${photoId}`,{
        withCredentials:true
       })
       if(response.status === 200){
        setMemberData((prevMembers)=>{
           return prevMembers.filter((Member)=>{
                return Member?._id !== Id
            })
        })
       }
    }

    const handleEdit=(SubscriptionId)=>{
      navigate("/admin-panel/plan",{
        state:{Id:SubscriptionId, isEdit:true}
      })
    }


    return (
        <>
            <ChakraProvider>

                <div className='member-area'>
                    <div className='member-bar'>
                        <div>
                            <label htmlFor="">Sort Order : </label>
                            <select onChange={handleSort} style={{ color: "black", padding:"2px"}} >
                                <option value="start">start-date</option>
                                <option value="end">end-date</option>

                            </select>

                        </div>
                        <div className='search-bar'>
                            <input
                                color='black'
                                type='text'
                                placeholder='Search by name'
                                value={searchData}
                                onChange={handleChange}
                                readOnly={searchActive ? "" : "readOnly"}

                            >

                            </input>{
                                searchActive ? <SearchIcon onClick={handleSearch} color="white" margin="0px 4px" boxSize="20px" /> :
                                    <CloseIcon onClick={handleCancel} color="white" margin="0px 4px" boxSize="20px" />
                            }

                        </div>
                    </div>
                    <div className='member-content'>
                        {memberData?.length > 0 ? (
                            memberData.map((Member) => {
                                const today = new Date()
                                const endDate = new Date(Member?.endDate)
                                const isActive = today.getTime() < endDate.getTime()

                                return (
                                 
                                    <Card
                                        key={Member._id}
                                        boxShadow="white 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                                        height= "max-content"
                                        width="30%"
                                        backgroundColor="#01070f"
                                        color="white"
                                        borderRadius="20px"
                                        minHeight="480px"
                                        
                                    >
                                        <CardHeader textAlign="center" display="flex" flexDirection="column" justifyItems="left" alignItems="center">
                                            {/* <Switch display="flex" alignContent="left" justifyItems="left" justifyContent="left"/> */}

                                            <Image style={{ border: `4px solid ${isActive ? '#73c737' : '#bf1818'}` }}
                                                borderRadius="200px"
                                                width="160px"
                                                height="160px"
                                                borderColor="#01070f"
                                                src={Member?.memberId?.photo || ""}
                                                objectFit="cover"
                                                objectPosition="90% 7%"
                                                padding="10px"
                                                margin="10px"

                                            >
                                            </Image>
                                            <Avatar display="none"> <AvatarBadge boxSize='32px' bg={isActive ? 'green.600' : 'red.600'} />   </Avatar>
                                            <Heading fontSize="24px">{Member?.memberId?.fullName.toUpperCase()}</Heading>
                                            <Text padding="3px">{Member?.memberId?.email}</Text>
                                            <Text padding="3px">Mobile-Number:{Member?.memberId?.mobileNumber}</Text>
                                        </CardHeader>

                                        <CardBody display="flex" flexDirection="column" justifyContent="left" justifyItems="left">
                                            <Heading fontSize="22px">Subscription Details</Heading>
                                            <Text padding="3px"><span style={{ fontWeight: "bold" }}>Joining Date: </span>{new Date(Member?.startDate).toLocaleDateString() || 'N/A'}</Text>
                                            <Text padding="3px"><span style={{ fontWeight: "bold" }}>Ending Date: </span>  {new Date(Member?.endDate).toLocaleDateString() || 'N/A'}</Text>
                                            <Text padding="3px"><span style={{ fontWeight: "bold" }}>Duration: </span>{Member?.Durationmonths} months</Text>
                                        </CardBody>

                                        <CardFooter
                                        display="flex"
                                        justifyContent="right"
                                        >
                                         <Button margin="2px"onClick={() => handleDelete(Member?._id,Member?.memberId?.photo)} _hover={{  bg: "#004bbb",boxSize:"38px" }}  boxSize="40px"><DeleteIcon  color="black" boxSize="25px"/></Button>
                                         <Button margin="2px" onClick={() => handleEdit(Member?._id)} _hover={{  bg: "#004bbb",boxSize:"38px" }}  boxSize="40px"><EditIcon  color="black" boxSize="25px"/></Button>
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