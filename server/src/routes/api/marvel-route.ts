import { Router } from 'express';
const router = Router();

import marvelService from '../../service/marvelService.js';

router.get('/hero/:name/comics', async (_req, res) => {
    const { name } = _req.params;

    try {
        // Fetch all relevant data using the MarvelService
        const description = await marvelService.getHeroDesc(name);
        const comics = await marvelService.getHeroComics(name);
        // console.log(description);
        // console.log(comics);

        return res.json({ description, comics })

    } catch (error) {
        console.error('Error fetching hero details:', error);
        return res.status(500).json('Something went wrong!');
    }
});

router.get('/hero/:name/events', async (req, res) => {
    const { name } = req.params;

    try {
        // Fetch all relevant data using the MarvelService
        const description = await marvelService.getHeroDesc(name);
        const events = await marvelService.getHeroEvents(name);

        return res.json({ description, events })
        // Render the hero page with the data (using a template engine)


    } catch (error) {
        console.error('Error fetching hero details:', error);
        return res.status(500).send('Something went wrong!');
    }
});

router.get('/hero/:name/series', async (req, res) => {
    const { name } = req.params;

    try {
        // Fetch all relevant data using the MarvelService
        const description = await marvelService.getHeroDesc(name);
        const series = await marvelService.getHeroSeries(name);


        // Render the hero page with the data (using a template engine)
        return res.json({ description, series })
    } catch (error) {
        console.error('Error fetching hero details:', error);
        return res.status(500).send('Something went wrong!');
    }
});

export default router;
