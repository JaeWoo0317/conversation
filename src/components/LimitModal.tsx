'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from '@/styles/LimitModal.module.css';

interface LimitModalProps {
  onClose: () => void;
}

export default function LimitModal({ onClose }: LimitModalProps) {
  const router = useRouter();
  const { dict } = useLanguage();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{dict.limitModal.title}</h2>
        <p className={styles.message}>{dict.limitModal.message}</p>
        
        <div className={styles.buttonGroup}>
          <button onClick={handleLogin} className={styles.primaryButton}>
            {dict.limitModal.loginButton}
          </button>
          <button onClick={onClose} className={styles.secondaryButton}>
            {dict.limitModal.cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
}
