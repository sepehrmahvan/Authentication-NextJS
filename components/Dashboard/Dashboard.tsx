"use client";
import api from "@/services/api";
import { localStorageUtils } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserData } from "@/types/user";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaShieldAlt, 
  FaSignOutAlt,
  FaCircle
} from "react-icons/fa";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = async () => {
    const response = await api.get("/api");

    if (response.status === 200) {
      setUserData(response.data.results[0]);
    } else {
      toast.error("خطا در دریافت اطلاعات کاربری");
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorageUtils.removeUserPhone();
    toast.success("خروج موفقیت‌آمیز بود!");
    router.push("/login");
  };

  if (!userData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>داشبورد</h1>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <FaSignOutAlt />
            <p>خروج</p>
          </button>
        </div>

        {/* Welcome Card */}
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeContent}>
            <div className={styles.profileImageContainer}>
              <img
                src={userData.picture.large}
                alt={`${userData.name.first} ${userData.name.last}`}
                className={styles.profileImage}
              />
              <div className={styles.onlineIndicator}></div>
            </div>
            <div className={styles.welcomeText}>
              <h2 className={styles.welcomeTitle}>
                سلام، {userData.name.first} {userData.name.last}!
              </h2>
              <p className={styles.welcomeSubtitle}>
                خوش آمدید به پنل کاربری شما
              </p>
              <div className={styles.userInfo}>
                <span><FaUser /> {userData.login.username}</span>
                <span><FaEnvelope /> {userData.email}</span>
                <span><FaPhone /> {userData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Grid */}
        <div className={styles.infoGrid}>
          {/* Personal Info */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.cardIconBlue}`}>
                <FaUser />
              </div>
              <h3 className={styles.cardTitle}>اطلاعات شخصی</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>نام:</span>
                <span className={styles.infoValue}>{userData.name.title} {userData.name.first} {userData.name.last}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>جنسیت:</span>
                <span className={styles.infoValue}>{userData.gender === 'female' ? 'زن' : 'مرد'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>سن:</span>
                <span className={styles.infoValue}>{userData.dob.age} سال</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ملیت:</span>
                <span className={styles.infoValue}>{userData.nat}</span>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.cardIconGreen}`}>
                <FaMapMarkerAlt />
              </div>
              <h3 className={styles.cardTitle}>موقعیت مکانی</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>شهر:</span>
                <span className={styles.infoValue}>{userData.location.city}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>استان:</span>
                <span className={styles.infoValue}>{userData.location.state}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>کشور:</span>
                <span className={styles.infoValue}>{userData.location.country}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>کد پستی:</span>
                <span className={styles.infoValue}>{userData.location.postcode}</span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className={styles.infoCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.cardIconPurple}`}>
                <FaShieldAlt />
              </div>
              <h3 className={styles.cardTitle}>اطلاعات حساب</h3>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>نام کاربری:</span>
                <span className={styles.infoValue}>{userData.login.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>تاریخ ثبت‌نام:</span>
                <span className={styles.infoValue}>{new Date(userData.registered.date).toLocaleDateString('fa-IR')}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>سن حساب:</span>
                <span className={styles.infoValue}>{userData.registered.age} سال</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>UUID:</span>
                <span className={styles.infoValueSmall}>{userData.login.uuid.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className={styles.welcomeBanner}>
          <h3 className={styles.bannerTitle}>خوش آمدید به سیستم!</h3>
          <p className={styles.bannerText}>
            امیدواریم تجربه‌ی خوبی در استفاده از پنل کاربری داشته باشید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
