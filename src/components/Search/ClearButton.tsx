import { LoadingButton } from '@mui/lab';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';

const ClearButton = ({ clearSearch }: { clearSearch: () => void }) => {
  return (
    <LoadingButton
      size="large"
      onClick={clearSearch}
      variant="outlined"
      startIcon={<SearchOffOutlinedIcon />}
    >
      Limpar pesquisa
    </LoadingButton>
  );
};

export default ClearButton;
