// Test script for the physics solver API with different load types

interface TestCase {
  name: string;
  request: any;
}

const testCases: TestCase[] = [
  {
    name: 'Basic Force Problem',
    request: {
      loadType: 'basic',
      mass: 5,
      force: 20,
      angle: 30,
      coefficientFriction: 0.2
    }
  },
  {
    name: 'Dead Load Calculation',
    request: {
      loadType: 'dead',
      area: 15,
      thickness: 0.25,
      density: 2400
    }
  },
  {
    name: 'Live Load Calculation',
    request: {
      loadType: 'live',
      area: 20,
      loadPerArea: 3000
    }
  },
  {
    name: 'Wind Load Calculation',
    request: {
      loadType: 'wind',
      area: 50,
      velocity: 25,
      dragCoefficient: 1.2
    }
  },
  {
    name: 'Seismic Load Calculation',
    request: {
      loadType: 'seismic',
      mass: 15000,
      spectralAcceleration: 0.4,
      importanceFactor: 1.2,
      responseModificationFactor: 6.0
    }
  }
];

async function runTest(testCase: TestCase) {
  console.log(`\n🚀 Running Test: ${testCase.name}`);
  console.log('='.repeat(50));
  
  try {
    const response = await fetch('http://localhost:3000/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCase.request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    const result = await response.json();
    
    console.log('\n📝 Request:');
    console.log(JSON.stringify(testCase.request, null, 2));
    
    console.log('\n📊 Response:');
    console.log(JSON.stringify({
      type: result.solution.type,
      finalAnswer: result.solution.finalAnswer,
      loadSolutions: result.solution.loadSolutions?.map((ls: any) => ({
        type: ls.type,
        totalLoad: ls.totalLoad,
        unit: ls.unit
      }))
    }, null, 2));
    
    console.log('\n✅ Test passed!');
    return true;
  } catch (error) {
    console.error('\n❌ Test failed:');
    console.error(error instanceof Error ? error.message : error);
    return false;
  } finally {
    console.log('='.repeat(50));
  }
}

async function runAllTests() {
  console.log('🏁 Starting Physics Solver Tests');
  console.log('='.repeat(50));
  
  let passed = 0;
  
  for (const testCase of testCases) {
    const success = await runTest(testCase);
    if (success) passed++;
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📊 Test Results: ${passed}/${testCases.length} tests passed`);
  console.log('='.repeat(50));
  
  if (passed === testCases.length) {
    console.log('🎉 All tests completed successfully!');
  } else {
    console.log('❌ Some tests failed. Please check the logs above.');
  }
}

// Run all tests
runAllTests().catch(console.error);
