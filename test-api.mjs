// Test working Brawlhalla Esports API
const API_URL = 'https://api.brawltools.com/v2';

async function testAPI() {
  console.log('=== Brawlhalla Esports API Test ===\n');

  // Test 1: Get a pro player
  console.log('1. Getting pro player (ID: 1)...');
  const playerRes = await fetch(`${API_URL}/player/1`);
  const playerData = await playerRes.json();
  console.log('Player:', JSON.stringify(playerData.player, null, 2));

  // Test 2: Search by Brawlhalla ID (ton ID)
  console.log('\n2. Searching by Brawlhalla ID: 110422440...');
  const bhIdRes = await fetch(`${API_URL}/player/bhId/110422440`);
  if (bhIdRes.status === 200) {
    const bhData = await bhIdRes.json();
    console.log('Found:', JSON.stringify(bhData, null, 2));
  } else {
    console.log('Status:', bhIdRes.status, '- Not in esports database (normal for non-pro players)');
  }

  // Test 3: Try to find Sandstorm
  console.log('\n3. Getting a known pro player (trying IDs 1-5)...');
  for (let i = 1; i <= 5; i++) {
    const res = await fetch(`${API_URL}/player/${i}`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(`  Player ${i}: ${data.player?.name || 'Unknown'}`);
    }
  }

  // Test 4: Get player stats
  console.log('\n4. Getting player legends for player 1...');
  const legendsRes = await fetch(`${API_URL}/player/1/legends`);
  if (legendsRes.status === 200) {
    const legendsData = await legendsRes.json();
    console.log('Legends data:', JSON.stringify(legendsData, null, 2).substring(0, 500));
  }

  console.log('\n=== API TEST COMPLETE ===');
  console.log('\nConclusion:');
  console.log('- API works for ESPORTS pro players only');
  console.log('- Regular players (like ID 110422440) are not in this database');
  console.log('- For regular player stats, you need the official Brawlhalla API key');
}

testAPI().catch(console.error);
