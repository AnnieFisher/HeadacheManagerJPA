-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema tracker
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tracker` ;

-- -----------------------------------------------------
-- Schema tracker
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tracker` DEFAULT CHARACTER SET utf8 ;
USE `tracker` ;

-- -----------------------------------------------------
-- Table `User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `User` ;

CREATE TABLE IF NOT EXISTS `User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `amtDay` INT NULL,
  `amtWeek` INT NULL,
  `avgPainScale` DOUBLE NULL,
  `avgDuration` DOUBLE NULL,
  `overallSymptoms` VARCHAR(450) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Headache`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Headache` ;

CREATE TABLE IF NOT EXISTS `Headache` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `onset` INT NULL,
  `duration` INT NULL,
  `amtSleep` INT NULL,
  `painScale` INT NULL,
  `symptoms` VARCHAR(400) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_headache_User_idx` (`User_id` ASC),
  CONSTRAINT `fk_headache_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO tracker;
 DROP USER tracker;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'tracker' IDENTIFIED BY 'password';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'tracker';

-- -----------------------------------------------------
-- Data for table `User`
-- -----------------------------------------------------
START TRANSACTION;
USE `tracker`;
INSERT INTO `User` (`id`, `amtDay`, `amtWeek`, `avgPainScale`, `avgDuration`, `overallSymptoms`) VALUES (1, 4, 9, 4, 72.5, 'vertigo, numbness');
INSERT INTO `User` (`id`, `amtDay`, `amtWeek`, `avgPainScale`, `avgDuration`, `overallSymptoms`) VALUES (2, 3, 6, 5.5, 45, 'confusion, lethargy');
INSERT INTO `User` (`id`, `amtDay`, `amtWeek`, `avgPainScale`, `avgDuration`, `overallSymptoms`) VALUES (3, 5, 6, 4.5, 25, 'pain, pain');
INSERT INTO `User` (`id`, `amtDay`, `amtWeek`, `avgPainScale`, `avgDuration`, `overallSymptoms`) VALUES (4, 5, 8, 5.5, 65, 'more pain, more pain');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Headache`
-- -----------------------------------------------------
START TRANSACTION;
USE `tracker`;
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (1, 1, 0700, 120, 360, 5, 'vertigo');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (2, 1, 1800, 25, 400, 3, 'numbness');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (3, 2, 1200, 30, 200, 5, 'confusion');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (4, 2, 1000, 60, 225, 6, 'lethargy');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (5, 3, 0900, 20, 350, 4, 'pain');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (6, 3, 1500, 30, 400, 5, 'pain');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (7, 4, 1300, 60, 500, 8, 'more pain');
INSERT INTO `Headache` (`id`, `User_id`, `onset`, `duration`, `amtSleep`, `painScale`, `symptoms`) VALUES (8, 4, 2300, 70, 360, 3, 'more pain');

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
