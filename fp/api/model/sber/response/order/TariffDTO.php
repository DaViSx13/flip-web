<?php

/**
 * Îáúåêò "Îïöèè òàğèôà"
 */
class TariffDTO
{

    /**
     * èäåíòèôèêàòîğ òàğèôà
     * @var integer
     */
    public $id;

    /**
     * Èíäèôèêàòîğ òàğèôà
     * @var string
     */
    public $name;

    /**
     * ñòàğòîâàÿ ñòîèìîñòü, êîï
     * @var integer
     */
    public $startPrice;

    /**
     * ñòîèìîñòü çà 1 êì, êîï
     * @var integer
     */
    public $oneKmPrice;

    /**
     * ñòîèìîñòü çà 1 ìèí, êîï
     * @var integer
     */
    public $oneMinPrice;

    /**
     * âğåìÿ áåñïëàòíîãî îæèäàíèÿ, ìèí
     * @var integer
     */
    public $freeWaitMinutes;

    /**
     * ñòîèìîñòü îæèäàíèÿ çà 1 ìèí, êîï
     * @var integer
     */
    public $waitTimePrice;

    /**
     * ñòîèìîñòü îòìåíû çàêàçà, êîï
     * @var integer
     */
    public $cancellationPrice;

    /**
     * Äîï. îïåğàöèÿ
     * @var array
     */
    public $options;

    /**
     * Êîíñòğóêòîğ ñ îáÿçàòåëüíûìè ïîëÿìè.
     * @param int $id ÈÄ òàğèôà
     */
    public function __construct($id)
    {
        $this->id = $id;
    }
}