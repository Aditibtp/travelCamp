CREATE TABLE `travelcamp`.`travel_cities` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `city_name` VARCHAR(45) NOT NULL,
  `state_name` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`city_id`));

  CREATE TABLE `travelcamp`.`travel_place` (
  `place_id` INT NOT NULL,
  `city_id` INT(10) NOT NULL,
  `place_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`place_id`),
  INDEX `city_id_idx` (`city_id` ASC),
  CONSTRAINT `city_id`
    FOREIGN KEY (`city_id`)
    REFERENCES `travelcamp`.`travel_cities` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


    CREATE TABLE `travelcamp`.`time_place` (
  `time_place_id` INT AUTO_INCREMENT NOT NULL,
  `place_id` INT NOT NULL,
  `num_of_visitors` INT NULL,
  `time_of_visit` DATETIME NULL,
  PRIMARY KEY (`time_place_id`),
  INDEX `place_id_idx` (`place_id` ASC),
  CONSTRAINT `place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `travelcamp`.`travel_place` (`place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  CREATE TABLE `travelcamp`.`activities_name` (
  `activityId` INT NOT NULL,
  `activityName` VARCHAR(45) NULL,
  PRIMARY KEY (`activityId`));



  CREATE TABLE `travelcamp`.`available_activities` (
    `idTravelPlaceActivities` INT NOT NULL AUTO_INCREMENT,
    `cityId` INT(45) NULL,
    `placeId` INT NULL,
    `activityId` INT NULL,
    INDEX `cityId_idx` (`cityId` ASC),
    PRIMARY KEY (`idTravelPlaceActivities`),
    INDEX `placeId_idx` (`placeId` ASC),
    INDEX `activityId_idx` (`activityId` ASC),
    CONSTRAINT `cityId`
      FOREIGN KEY (`cityId`)
      REFERENCES `travelcamp`.`travel_cities` (`city_id`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `placeId`
      FOREIGN KEY (`placeId`)
      REFERENCES `travelcamp`.`travel_place` (`place_id`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT `activityId`
      FOREIGN KEY (`activityId`)
      REFERENCES `travelcamp`.`activities_name` (`activityId`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
