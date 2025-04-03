
export const HeaderBrand = ({ 
    textSize = 'xl',
    className = '' 
  }) => {
  
    // Размеры для текста
    const textSizes = {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-3xl',
      '2xl': 'text-5xl'
    };
  
    return (
      <div className="flex items-center">
        <h1 className={`${textSizes[textSize]} mx-5 font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-300 
          bg-clip-text text-transparent bg-size-200 animate-gradient duration-300 cursor-pointer ${className}`}>
          Sellica
        </h1>
      </div>
    );
  };