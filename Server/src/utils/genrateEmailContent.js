const RegisterContent= (data)=>{
    return`
    <h1>Welcome, ${data.memberId.fullName}! in our gym</h1>
    <p>Thank you for registering. Here are your subscription details:</p>
    <p>Start Date: ${new Date(data.startDate).toLocaleDateString()}</p>
    <p>End Date: ${new Date(data.endDate).toLocaleDateString()}</p>
    <p>Duration: ${data.Durationmonths} months</p>`
}

const ReminderContent= (data)=>{
   
    return `
    <h1>Subscription is End Now, ${data.memberId.fullName}!</h1>
    <p>We wanted to remind you that your subscription is now end. Here are the details:</p>
    <p><strong>Start Date:</strong> ${new Date(data.startDate).toLocaleDateString()}</p>
    <p><strong>End Date:</strong> ${new Date(data.endDate).toLocaleDateString()}</p>
    <p><strong>Duration:</strong> ${data.Durationmonths} months</p>
    <p>We hope you enjoyed your time with us and consider renewing your subscription. If you have any questions or need assistance, feel free to contact us.</p>
    <p>Best regards,</p>
    <p>Your Gym Team</p>`;
}

export {RegisterContent,ReminderContent};