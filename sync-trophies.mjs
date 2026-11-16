import fs from 'fs';
import dotenv from 'dotenv';
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  getUserTitles
} from 'psn-api';

dotenv.config();

async function syncPlatinums() {
  const npsso = process.env.PSN_NPSSO;
  if (!npsso) {
    console.error('Missing PSN_NPSSO in .env file.');
    process.exit(1);
  }

  try {
    console.log('Authenticating with PlayStation Network...');
    const accessCode = await exchangeNpssoForAccessCode(npsso);
    const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

    console.log('Fetching full PSN game history...');
    let allTitles = [];
    let offset = 0;
    const pageSize = 250;
    let totalItemCount = Infinity;

    while (offset < totalItemCount) {
      const response = await getUserTitles(authorization, 'me', {
        limit: pageSize,
        offset: offset
      });

      const titles = response.trophyTitles || [];
      allTitles.push(...titles);
      totalItemCount = response.totalItemCount ?? titles.length;

      console.log(`Scanned ${allTitles.length} of ${totalItemCount} total games...`);

      if (titles.length === 0) break;
      offset += titles.length;
    }

    const platinums = allTitles
      .filter((game) => game.earnedTrophies?.platinum > 0)
      .map((game) => ({
        id: game.npCommunicationId,
        title: game.trophyTitleName,
        platform: game.trophyTitlePlatform,
        icon: game.trophyTitleIconUrl,
        date: new Date(game.lastUpdatedDateTime).toLocaleDateString(),
        earnedTrophies: game.earnedTrophies,
        isPlatinum: true,
        category: [],
        notes: ''
      }));

    fs.writeFileSync('./public/trophies.json', JSON.stringify(platinums, null, 2));
    console.log(`Saved ${platinums.length} Platinum trophies out of ${allTitles.length} total games!`);
  } catch (err) {
    console.error('Failed to sync PSN trophies:', err.message);
  }
}

syncPlatinums();