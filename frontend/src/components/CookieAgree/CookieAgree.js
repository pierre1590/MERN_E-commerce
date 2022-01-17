import CookieConsent from 'react-cookie-consent';

const CookieAgree = () => {
    
    return (
        <CookieConsent
        debug={true}
            location="top"
            buttonText="Accept!"
            cookieName="myCookieAgree"
            style={{ background: '#2B372B',opacity:'0.9',height:'140px',fontSize:'20px',textAlign:'center' }}
            buttonStyle={{ color: '#4e503b', fontSize: '18px',borderRadius:'5px' }}
            expires={150}
            
        >
            This website uses cookies to enhance the user experience.{" "}
            <a href="https://cookiesandyou.com" target="_blank" rel="noopener noreferrer" style={{color:'#f01'}}>
                Learn more
            </a>
        </CookieConsent>
    );
};

export default CookieAgree;