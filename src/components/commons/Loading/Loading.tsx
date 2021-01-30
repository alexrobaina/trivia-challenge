import { motion } from 'framer-motion';
import styles from './loading.module.scss';

const Loading = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={styles.loading}
    >
      calgando sdghsdsdefsh zsghsd
    </motion.div>
  );
};

export default Loading;
