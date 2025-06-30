import React from 'react';
import styles from './SocialLogins.module.css';

const socialPlatforms = [
    { name: 'QQ', icon: 'fab fa-qq', color: '#12B7F5' },
    { name: 'Weibo', icon: 'fab fa-weibo', color: '#E6162D' },
    { name: 'WeChat', icon: 'fab fa-weixin', color: '#09B83E' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#171515' },
    // 可根据需求添加更多
];

const SocialLogins = () => {
    return (
        <div className={styles.socialContainer}>
            <div className={styles.divider}>
                <span>其他登录方式</span>
            </div>
            <div className={styles.iconList}>
                {socialPlatforms.map(platform => (
                    <button key={platform.name} className={styles.iconButton} title={`使用 ${platform.name} 登录`} style={{'--icon-color': platform.color} as React.CSSProperties}>
                        <i className={platform.icon}></i>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SocialLogins;