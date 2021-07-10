import CircularProgress from '@material-ui/core/CircularProgress';

import classes from './Loader.module.css';

const Loader = () => (
  <div className={classes.Loader}>
    <CircularProgress />
  </div>
);

export default Loader;
