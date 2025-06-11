// src/components/student/Header/ProfileDropdown.tsx
import React from 'react';
import styles from './ProfileDropdown.module.css';

const ProfileDropdown = () => {
    return (
        <div className={styles.profileDropdown}>
            <div className={styles.profileInfo}>
                <div className={styles.profileAvatar}></div>
                <div className={styles.profileDetails}>
                    <h4>创客贴用户 <span className={styles.creatorTag}>创建者</span></h4>
                    <p>用户ID: 100349814 <i className="far fa-copy"></i></p>
                </div>
            </div>
            <div className={styles.upgradeCard}>
                <div className={styles.upgradeIcon}>
                    <i className="far fa-gem"></i>
                </div>
                <div className={styles.upgradeText}>
                    <h4>免费版</h4>
                    <p>开通会员尊享专属特权</p>
                    <span>50万+模板 · 商用授权 · 无水印下载</span>
                </div>
                <button className={styles.upgradeButton}>立即开通</button>
            </div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <label>存储空间 <a href="#">扩容 </a></label>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: '10%' }}></div>
                    </div>
                    <p>54.77K / 3G</p>
                </div>
                <div className={styles.infoItem}>
                    <label>AI贴贴 <i className="far fa-question-circle"></i> <a href="#">加购 </a></label>
                    <div className={styles.aiPoints}>30</div>
                    <a href="#" className={styles.monthlyBenefit}>会员每月免费领贴贴 </a>
                </div>
            </div>
            <div className={styles.teamSection}>
                <div className={styles.profileAvatarSmall}></div>
                <p>创客贴用户</p>
                <span>个人版</span>
                <div className={styles.createTeam}>
                    <i className="fas fa-plus"></i> 创建团队
                    <span className={styles.freeTrialTag}>免费体验</span>
                </div>
            </div>
            <nav className={styles.actionList}>
                <a href="#"><i className="fas fa-receipt"></i> 订单/发票</a>
                <a href="#"><i className="fas fa-comment-dots"></i> 消息中心</a>
                <a href="#"><i className="fas fa-tags"></i> 我的优惠券</a>
            </nav>
            <div className={styles.logoutWrapper}>
                <button className={styles.logoutButton}>退出登录</button>
            </div>
        </div>
    );
};

export default ProfileDropdown;