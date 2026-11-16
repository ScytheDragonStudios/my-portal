import fs from 'fs';
import dotenv from 'dotenv';
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  getTitleTrophies
} from 'psn-api';

dotenv.config();

const RARITY_LABELS = {
  0: 'Ultra Rare',
  1: 'Very Rare',
  2: 'Rare',
  3: 'Common'
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function syncPlatinums() {
  const npsso = process.env.PSN_NPSSO?.trim();
  if (!npsso) {
    console.error('Missing PSN_NPSSO in .env file.');
    process.exit(1);
  }

  try {
    console.log('1. Authenticating with PlayStation Network...');
    const accessCode = await exchangeNpssoForAccessCode(npsso);
    const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

    console.log('2. Fetching PSN game library...');
    const response = await getUserTitles(authorization, 'me', { limit: 800 });
    const allTitles = response.trophyTitles || [];

    const platinumGames = allTitles.filter(
      (game) => game.earnedTrophies?.platinum > 0
    );
    console.log(`Found ${platinumGames.length} Platinum games out of ${allTitles.length} total titles.`);

    const platinums = [];


    for (let i = 0; i < platinumGames.length; i++) {
      const game = platinumGames[i];
      const serviceOption = {
        npServiceName: game.trophyTitlePlatform !== 'PS5' ? 'trophy' : undefined,
        limit: 5
      };

      let rarityText = 'Ultra Rare';
      let trophyName = 'Platinum Achieved';
      let unlockedDate = new Date(game.lastUpdatedDateTime).toLocaleDateString();
      let iconUrl = game.trophyTitleIconUrl;

      try {
        const earnedRes = await getUserTrophiesEarnedForTitle(
          authorization,
          'me',
          game.npCommunicationId,
          'default',
          serviceOption
        );

        const platEarned = earnedRes.trophies?.find(
          (t) => t.trophyType === 'platinum' || t.trophyId === 0
        );

        if (platEarned) {
          const tier = RARITY_LABELS[platEarned.trophyRare] ?? 'Rare';
          const rate = platEarned.trophyEarnedRate ? ` (${platEarned.trophyEarnedRate}%)` : '';
          rarityText = `${tier}${rate}`;

          if (platEarned.earnedDateTime) {
            unlockedDate = new Date(platEarned.earnedDateTime).toLocaleDateString();
          }
        }


        const titleRes = await getTitleTrophies(
          authorization,
          game.npCommunicationId,
          'default',
          serviceOption
        );

        const platMeta = titleRes.trophies?.find(
          (t) => t.trophyType === 'platinum' || t.trophyId === 0
        );

        if (platMeta?.trophyName) {
          trophyName = platMeta.trophyName;
        }
      } catch (innerErr) {
        console.warn(`Could not fetch detailed rarity for ${game.trophyTitleName}, using defaults.`);
      }

      console.log(`[${i + 1}/${platinumGames.length}] ${game.trophyTitleName} -> ${rarityText}`);

      platinums.push({
        id: game.npCommunicationId,
        title: game.trophyTitleName,
        trophyName: trophyName,
        platform: game.trophyTitlePlatform,
        icon: iconUrl,
        date: unlockedDate,
        rarity: rarityText,
        earnedTrophies: game.earnedTrophies,
        isPlatinum: true,
        category: [],
        notes: ''
      });

      await sleep(150);
    }

    fs.mkdirSync('./public', { recursive: true });
    fs.writeFileSync('./public/trophies.json', JSON.stringify(platinums, null, 2));
    console.log(`3. Success! Saved ${platinums.length} Platinum trophies with live rarity to public/trophies.json.`);
  } catch (err) {
    console.error('Failed to sync PSN trophies:', err);
  }
}

syncPlatinums();