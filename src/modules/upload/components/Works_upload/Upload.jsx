import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addNewWork } from '../../../../store/slices/workSlice';
import { UploadDropzone } from '../../ui/UploadDropzone';
import { UploadForm } from './UploadForm/UploadForm';
import { UploadPreview } from './UploadPreview';
import { SuccessStatus } from './UploadStatus/SuccesStatus';
import { ErrorStatus } from './UploadStatus/ErrorStatus';
import { UploadLayout } from './UploadLayout/UploadLayout';

export const Upload = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleUploadSuccess = (uploadData) => {
    dispatch(addNewWork(uploadData.work));
    setUploadStatus('success');
    setUploadError(null);
  };

  const handleUploadError = (error) => {
    setUploadStatus('error');
    setUploadError(error.message || 'An unknown error occurred');
  };

  const handleReturnToProfile = () => {
    user?._id && navigate(`/profile/${user._id}`);
  };

  const resetUpload = () => {
    setUploadStatus(null);
    setFiles([]);
  };

  if (uploadStatus === 'success') {
    return (
      <SuccessStatus 
        onReturnToProfile={handleReturnToProfile}
        onResetUpload={resetUpload}
      />
    );
  }

  if (uploadStatus === 'error') {
    return (
      <ErrorStatus 
        error={uploadError}
        onTryAgain={resetUpload}
        onReturnToProfile={handleReturnToProfile}
      />
    );
  }

  return (
    <UploadLayout files={files} setFiles={setFiles}>
      <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
        <UploadDropzone
          onFilesAccepted={setFiles}
          currentFiles={files} 
        />
      </div>
      
      <>
        <UploadPreview files={files} setFiles={setFiles} />
        <UploadForm 
          files={files} 
          setFiles={setFiles}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
      </>
    </UploadLayout>
  );
};