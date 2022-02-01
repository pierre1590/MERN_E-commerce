import gravatar from 'gravatar';

const generateGravatar = (email) => {
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'identicon'
    });
    return avatar;
}

export default generateGravatar;