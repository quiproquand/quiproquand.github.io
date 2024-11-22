# Comment ajouter un post

Chaque jour a son propre fichier HTML. Ils sont tous classés par mois dans leur dossier respectif (valeur numérique du mois). Par exemple, le 6 février se trouve à l'emplacement `2/6.html`. Si le fichier n'existe pas, il faut le créer. **<span style="color:red">Attention, chaque fichier de ce type doit se terminer par la ligne :</span>**

    <script src="js/manip.js"></script>

## Ajouter un message simple
Un simple message a cette forme :

    <div class="post" data-author="nom_auteur">
            Coucou, ceci est un post !
    </div>
Le message peut être organisé comme l'on souhaite mais il ne peut pas contenir d'image.

## Ajouter une image
Il faut tout d'abord ajouter l'image que l'on veut insérer dans le dossier `img`. Un post avec une image a cette forme :

    <div class="post imager" data-author="nom_auteur" data-img="./img/nom_image.extension">
            Texte facultatif
    </div>

# Comment ajouter un RDV
Toutes les dates de rendez-vous (passés et futurs) sont stockées dans le fichier `meetups.js` sous la forme d'un tableau. Elles doivent être classées par ordre chronologique. Pour ajouter une date, il faut respecter le format *AAAA/MM/DD*.

    const MEETUPS = [new Date(2024,11,2),
                    new Date(2025,1,6]);
                    
**<span style="color:red">Attention, les mois (contrairement aux jours) commencent à 0.</span>** Le 6 février 2025 se note donc `new Date(2025/1/6)`.



