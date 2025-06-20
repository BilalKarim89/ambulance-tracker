import React from 'react';

const steps = ['Call Received', 'Left Hospital', 'En Route', 'Arrived'];

export default function StepperComponent({ currentStep }) {
  return (
    <div style={styles.stepperContainer}>
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={label} style={styles.stepWrapper}>
            {/* Circle */}
            <div
              style={{
                ...styles.circle,
                backgroundColor: isActive
                  ? '#007bff'
                  : isCompleted
                  ? '#007bff'
                  : '#e0e0e0',
                color: isActive || isCompleted ? 'white' : '#999',
                borderColor: isActive ? '#000' : '#e0e0e0',
              }}
            >
              {index + 1}
            </div>

            {/* Label */}
            <div
              style={{
                ...styles.label,
                color: isActive || isCompleted ? '#007bff' : '#999',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {label}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  ...styles.connector,
                  backgroundColor: '#d3d3d3', // light grey line
                  height: 1,                // smaller height
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  stepperContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 700,
    margin: '0 auto',
  },
  stepWrapper: {
    position: 'relative',
    flex: 1,
    textAlign: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    margin: '0 auto',
    borderRadius: '50%',
    border: '1px solid',
    lineHeight: '32px',
    fontWeight: 'bold',
    fontSize: 14,
    userSelect: 'none',
    zIndex: 1,
    position: 'relative',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    userSelect: 'none',
  },
  connector: {
    position: 'absolute',
    top: 15,
    left: '50%',
    width: '100%',
    zIndex: 0,
  },
};
