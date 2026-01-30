import styles from '@/styles/SkeletonLoader.module.css';

interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SkeletonLoader({ height = '20px', width = '100%', className = '', style = {} }: SkeletonProps) {
  return (
    <div 
      className={`${styles.skeleton} ${className}`} 
      style={{ height, width, ...style }}
    ></div>
  );
}

export function ResultSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SkeletonLoader height="30px" width="100px" />
        <SkeletonLoader height="40px" width="60%" />
      </div>

      <div className={styles.card}>
        <SkeletonLoader height="28px" width="40%" style={{ marginBottom: '1rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
             <SkeletonLoader height="20px" width="50%" style={{ marginBottom: '0.5rem' }} />
             <SkeletonLoader height="60px" />
          </div>
          <div>
             <SkeletonLoader height="20px" width="50%" style={{ marginBottom: '0.5rem' }} />
             <SkeletonLoader height="60px" />
          </div>
        </div>
        <SkeletonLoader height="20px" width="30%" style={{ marginTop: '1rem', marginBottom: '0.5rem' }} />
        <SkeletonLoader height="40px" />
      </div>

      <div className={styles.card}>
        <SkeletonLoader height="28px" width="50%" style={{ marginBottom: '1rem' }} />
        <SkeletonLoader height="80px" style={{ marginBottom: '1rem' }} />
        <SkeletonLoader height="80px" />
      </div>

      <div className={styles.card}>
         <SkeletonLoader height="28px" width="60%" style={{ marginBottom: '1rem' }} />
         <div style={{ display: 'flex', gap: '1rem' }}>
             <SkeletonLoader height="100px" width="100%" />
             <SkeletonLoader height="100px" width="100%" />
             <SkeletonLoader height="100px" width="100%" />
         </div>
      </div>
    </div>
  );
}
