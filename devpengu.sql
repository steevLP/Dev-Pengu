-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 24. Apr 2023 um 00:39
-- Server-Version: 10.4.27-MariaDB
-- PHP-Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `devpengu`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `reactions`
--

CREATE TABLE `reactions` (
  `id` bigint(20) NOT NULL,
  `message` varchar(20) NOT NULL,
  `type` varchar(30) NOT NULL,
  `reaction` varchar(30) NOT NULL,
  `action` varchar(20) NOT NULL,
  `rolename` varchar(30) DEFAULT NULL,
  `roleid` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `servers`
--

CREATE TABLE `servers` (
  `id` bigint(25) NOT NULL,
  `name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `serverusers`
--

CREATE TABLE `serverusers` (
  `id` bigint(20) NOT NULL,
  `serverid` bigint(25) NOT NULL,
  `userid` bigint(25) NOT NULL,
  `owner` tinyint(1) NOT NULL DEFAULT 0,
  `username` varchar(300) NOT NULL,
  `nickname` varchar(300) DEFAULT NULL,
  `xp` bigint(20) NOT NULL DEFAULT 0,
  `level` bigint(20) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `serverusers`
--
ALTER TABLE `serverusers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `servers`
--
ALTER TABLE `servers`
  MODIFY `id` bigint(25) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `serverusers`
--
ALTER TABLE `serverusers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
