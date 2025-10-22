import React, { useState } from 'react';

// --- Interface for Component Props (if this component were reusable) ---
interface SignUpPageProps {
  // Add any props here if passed from a parent component
}

// --- Interface for Local State ---
interface FormState {
  zineName: string;
  userName: string;
  password: string;
}

// --- Global Style Variables ---
// Defined outside the component for clarity and consistency
const colors = {
  bgLightPink: '#f6e6e8',
  hotPink: '#ff69b4',
  teal: '#1abc9c',
  orange: '#ff8c00',
  lightBlue: '#74d6e9',
  veryLightBlue: '#e0f7fa',
  darkTeal: '#20b2aa',
  shadowBlack: 'rgba(0, 0, 0, 0.2)',
  textDark: '#333',
  textMedium: '#555',
  indicatorBg: '#ffecb3',
  indicatorText: '#ffa000',
};

// --- Inline Style Definitions (TypeScript's React.CSSProperties) ---
// Note: We use the 'as' keyword to assert the type where needed, though standard CSS properties are inferred.

const styles: Record<string, React.CSSProperties> = {
  // --- Root and Background ---
  background: {
    backgroundColor: colors.bgLightPink,
    backgroundImage: `
      url('data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h8v8H0zM8 8h8v8H8z" fill="%23c4d7e0" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E'),
      url('data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 8h8v8H0zM8 0h8v8H8z" fill="%23dce2f0" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E')
    `,
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
  },

  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    width: '100%',
  },

  // --- Header ---
  signUpBanner: {
    backgroundColor: colors.hotPink,
    color: colors.teal,
    fontSize: '5em',
    fontWeight: 'bold',
    padding: '10px 40px',
    transform: 'rotate(-8deg)',
    position: 'relative',
    zIndex: 2,
    boxShadow: `5px 5px 0px ${colors.shadowBlack}`,
    textShadow: `3px 3px ${colors.darkTeal}`,
    borderRadius: '5px',
    letterSpacing: '-2px',
    // TypeScript/React often use camelCase for vendor prefixes
    WebkitTextStroke: '1px black',
  } as React.CSSProperties, // Cast to include non-standard CSS properties like text-stroke

  bannerBackground: {
    backgroundColor: colors.orange,
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    zIndex: -1,
    transform: 'rotate(2deg)',
    borderRadius: '8px',
  },

  mottoContainer: {
    marginTop: '-30px',
    textAlign: 'right',
    fontSize: '1.8em',
    lineHeight: 1.2,
    color: colors.textDark,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '15px 25px',
    boxShadow: `3px 3px 0px ${colors.shadowBlack.replace('0.2', '0.1')}`,
    borderRadius: '5px',
    transform: 'rotate(2deg)',
    position: 'relative',
    right: '-50px',
    top: '20px',
    zIndex: 1,
  },

  // --- Form ---
  input: {
    width: '100%',
    padding: '15px 20px',
    border: `2px solid ${colors.lightBlue}`,
    borderRadius: '30px',
    fontSize: '1.1em',
    outline: 'none',
    backgroundColor: colors.veryLightBlue,
    boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  // Other styles remain structurally the same as the previous JS version...
  formCard: {
    backgroundColor: '#fff',
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '40px 60px',
    boxShadow: `8px 8px 0px ${colors.shadowBlack.replace('0.2', '0.1')}`,
    width: '100%',
    maxWidth: '500px',
    boxSizing: 'border-box',
    transform: 'rotate(-2deg)',
    marginTop: '30px',
  },
  formGroup: { marginBottom: '25px' },
  label: { display: 'block', marginBottom: '10px', fontSize: '1.1em', fontWeight: 'bold', color: colors.textMedium },
  passwordStrength: { display: 'flex', alignItems: 'center', marginTop: '10px', fontSize: '0.9em', color: '#888' },
  strengthIndicator: { backgroundColor: colors.indicatorBg, color: colors.indicatorText, padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', marginLeft: '10px' },
  headerContainer: { position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' },
  nextButton: {
    backgroundColor: colors.hotPink,
    color: colors.teal,
    fontSize: '3em',
    fontWeight: 'bold',
    padding: '10px 30px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transform: 'rotate(5deg)',
    position: 'relative',
    bottom: '-40px',
    right: '-150px',
    zIndex: 2,
    boxShadow: `5px 5px 0px ${colors.shadowBlack}`,
    textShadow: `3px 3px ${colors.darkTeal}`,
    letterSpacing: '-1px',
    WebkitTextStroke: '1px black',
  } as React.CSSProperties,
  nextButtonBackground: {
    backgroundColor: colors.orange,
    position: 'absolute',
    top: '-8px',
    left: '-8px',
    right: '-8px',
    bottom: '-8px',
    zIndex: -1,
    transform: 'rotate(-3deg)',
    borderRadius: '8px',
  },
};


// --- Helper Component with proper TS typing for props ---
interface AbstractShapeProps {
  type: 'triangle' | 'square' | 'squiggly';
  size: number;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
}

const AbstractShape: React.FC<AbstractShapeProps> = ({ type, size, color, top, left, right, bottom, rotate }) => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    opacity: 0.6,
    transform: `rotate(${rotate}deg)`,
    zIndex: 0,
    top,
    left,
    right,
    bottom,
  };

  if (type === 'triangle') {
    return <div style={{
      ...baseStyle,
      backgroundColor: 'transparent',
      width: 0,
      height: 0,
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size * 1.5}px solid ${color}`,
    }} />;
  }

  if (type === 'square') {
    return <div style={{
      ...baseStyle,
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
    }} />;
  }

  if (type === 'squiggly') {
    return <div style={{
      ...baseStyle,
      backgroundColor: 'transparent',
      background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path fill="none" stroke="${encodeURIComponent(color)}" stroke-width="2" d="M0 10 C 25 0, 75 20, 100 10 S 125 0, 100 10"/></svg>') repeat-x`,
      backgroundSize: `${size}px ${size * 0.4}px`,
      width: `${size * 2}px`,
      height: `${size * 0.4}px`,
    }} />;
  }

  return null;
};


// --- Main TSX Component ---

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [formState, setFormState] = useState<FormState>({
    zineName: '',
    userName: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Form Submitted with data:', formState);
    // Add validation and API call logic here
  };

  return (
    <div style={styles.background}>
      {/* Background Shapes */}
      <AbstractShape type="triangle" size={30} color="#ADD8E6" top="10%" left="5%" rotate={-15} />
      <AbstractShape type="square" size={25} color="#FFD700" top="5%" right="10%" rotate={45} />
      <AbstractShape type="squiggly" size={60} color={colors.hotPink} top="20%" left="20%" rotate={-5} />
      <AbstractShape type="triangle" size={20} color="#90EE90" bottom="15%" left="15%" rotate={30} />
      <AbstractShape type="square" size={35} color="#F08080" bottom="5%" right="20%" rotate={-25} />
      <AbstractShape type="squiggly" size={40} color="#ADD8E6" bottom="10%" right="5%" rotate={10} />

      <div style={styles.contentWrapper}>
        <div style={styles.headerContainer}>
          <div style={styles.signUpBanner}>
            <div style={styles.bannerBackground}></div>
            Sign Up
          </div>
          <div style={styles.mottoContainer}>
            Join the movement.<br />
            Create your zine.
          </div>
        </div>

        <div style={styles.formCard}>
          <div style={styles.formGroup}>
            <label htmlFor="zineName" style={styles.label}>Your hella cool zine name</label>
            <input 
              id="zineName" 
              type="text" 
              placeholder="" 
              style={styles.input} 
              value={formState.zineName} 
              onChange={handleChange}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="userName" style={styles.label}>What should we call you?</label>
            <input 
              id="userName" 
              type="text" 
              placeholder="" 
              style={styles.input}
              value={formState.userName}
              onChange={handleChange}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              id="password" 
              type="password" 
              placeholder="" 
              style={styles.input}
              value={formState.password}
              onChange={handleChange}
            />
            <div style={styles.passwordStrength}>
              Strength: <span style={styles.strengthIndicator}>Whatever</span>
              <br />
              <small>A computer could gank your account in 0.0045 seconds, feel me?</small>
            </div>
          </div>
        </div>

        <button style={styles.nextButton} onClick={handleSubmit}>
          <div style={styles.nextButtonBackground}></div>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;