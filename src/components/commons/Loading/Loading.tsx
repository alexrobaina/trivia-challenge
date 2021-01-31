import { motion } from 'framer-motion';
import styles from './loading.module.scss';

const Loading = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.bodyLoading}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={styles.loading}
        transition={{ ease: 'easeOut' }}
      />
    </div>
  );
};

export default Loading;
